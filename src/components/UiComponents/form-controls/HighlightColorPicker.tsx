import { Popover } from "antd";
import { Highlighter } from "lucide-react";

interface Props {
  onSelect: (color: string | null) => void;
}

const colors = ["#fef08a", "#bbf7d0", "#bfdbfe", "#fecaca", "#ddd"];

const HighlightColorPicker = ({ onSelect }: Props) => {
  return (
    <Popover
      content={
        <div style={{ display: "flex", gap: "6px", padding: "4px" }}>
          {colors.map((color) => (
            <div
              key={color}
              onClick={() => onSelect(color)}
              style={{
                backgroundColor: color,
                width: 20,
                height: 20,
                borderRadius: "4px",
                cursor: "pointer",
                border: "1px solid #ccc",
              }}
            />
          ))}
          <div
            onClick={() => onSelect(null)}
            title="Remove highlight"
            style={{
              width: 20,
              height: 20,
              borderRadius: "4px",
              cursor: "pointer",
              border: "1px solid #ccc",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 10,
            }}
          >
            ✕
          </div>
        </div>
      }
      trigger="click"
    >
      <div className="button">
        <Highlighter size={18} />
      </div>
    </Popover>
  );
};

export default HighlightColorPicker;
