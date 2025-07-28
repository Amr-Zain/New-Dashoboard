export const applyCustomColorsToCSS = (colors: Record<string, string>) => {
  if (!colors) return;

  Object.entries(colors).forEach(([key, value]) => {
    const cssVarName = `--TW-${key.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`)}`;

    // نمرر اسم المفتاح للكشف عن كلمة "primary"
    const cleanedValue = cleanColorValue(value, key);

    if (!cleanedValue) return;

    document.documentElement.style.setProperty(cssVarName, cleanedValue);
  });
};

export function cleanColorValue(value: string, key: string): string | null {
  // لو القيمة بصيغة rgb(...) → نستخرج منها الأرقام فقط
  const rgbWrappedMatch = value.match(/^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/);
  if (rgbWrappedMatch) {
    const r = rgbWrappedMatch[1];
    const g = rgbWrappedMatch[2];
    const b = rgbWrappedMatch[3];
    return key.toLowerCase().includes("primary") ? `${r} ${g} ${b}` : `${r}, ${g}, ${b}`;
  }

  // لو القيمة بصيغة "r g b" أو "r,g,b"
  const rgbMatch = value.match(/(\d{1,3})[\s,]+(\d{1,3})[\s,]+(\d{1,3})/);
  if (rgbMatch) {
    const r = rgbMatch[1];
    const g = rgbMatch[2];
    const b = rgbMatch[3];
    return key.toLowerCase().includes("primary") ? `${r} ${g} ${b}` : `${r}, ${g}, ${b}`;
  }

  // لو HEX رجعه زي ما هو
  if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value)) {
    return value;
  }

  // fallback safe value
  return value;
}


//عشان الكااارردددددد
export function getSafeColors(color?: string) {
    const root = document.documentElement;

    // ناخد القيم من CSS variables
    const cssPrimary = getComputedStyle(root).getPropertyValue('--TW-primary-color').trim();
    const cssPrimaryLight = getComputedStyle(root).getPropertyValue('--TW-primary-color-light').trim();

    // fallback order: passed color > css var > default
    const primary = color || cssPrimary || 'rgb(72, 127, 255)';
    const lightPrimary = cssPrimaryLight || cssPrimary || 'rgb(72, 127, 255)';

    // clean and ensure correct format
    const cleanedPrimary = normalizeColor(primary);
    const cleanedLightPrimary = normalizeColor(lightPrimary);

    return { cleanedPrimary, cleanedLightPrimary };
}

function normalizeColor(value: string): string {
    if (!value) return 'rgb(72, 127, 255)';

    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(value)) {
        return value; // valid hex
    }

    if (/^rgb\s*\((\s*\d{1,3}\s*,){2}\s*\d{1,3}\s*\)$/.test(value)) {
        return value; // valid rgb
    }

    // Try to convert "72 127 255" or "72,127,255" to rgb(...)
    const parts = value.trim().split(/[\s,]+/);
    if (parts.length === 3 && parts.every((p) => /^\d{1,3}$/.test(p))) {
        return `rgb(${parts.join(', ')})`;
    }

    return 'rgb(72, 127, 255)'; // fallback
}

//عشان اخليه ياخد القيم الحاليه 
export const getCurrentThemeColorsFromCSS = () => {
  const root = document.documentElement;
  const getVar = (name: string) =>
    getComputedStyle(root).getPropertyValue(name).trim();

  return {
    primaryColor: `rgb(${getVar("--TW-primary-color")})`,
    // lightPrimaryColor: `rgb(${getVar("--TW-light-primary-color")})`,
    bodyColor: `${getVar("--TW-body-color")}`,
    darkColor: `${getVar("--TW-dark-color")}`,
    textColor: `rgb(${getVar("--TW-text-color")})`,
  };
};
