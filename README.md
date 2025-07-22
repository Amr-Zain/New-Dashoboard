# 🛍️ New Dashboard 

This is a modern, high-performance dashboard starter template built with the latest versions of:

* ⚡️ [Vite](https://vitejs.dev/) – lightning-fast dev/build tool
* ⚛️ [React 19+](https://react.dev/)
* 🔀 [React Router](https://reactrouter.com/)
* 🎿 [Redux Toolkit](https://redux-toolkit.js.org/) for state management
* 🧠 [TanStack Query (React Query)](https://tanstack.com/query/latest) for server state management

## 📂 Project Structure (Page-Based + SOLID Principles)

This project uses a **page-based folder structure** to organize code by features and follow **SOLID principles**. This means:

* Each entity/page has its own folder inside `src/pages`.
* Reusable logic/components are grouped by responsibility (`components`, `hooks`, `services`, etc.).
* Avoid monolithic files and ensure your code follows single responsibility and separation of concerns.

### Example Folder Structure

```bash
src/
├── assets/                    # Static assets (images, fonts, etc.)
├── components/               # Shared and feature-specific components
│   └── pagesComponents/      # Components for specific page entities (e.g., users, orders)
├── hooks/                    # Reusable custom hooks
├── pages/                    # Entity/page-level files (e.g., Users, Orders)
│   └── Users/
│       └── index.tsx         # Main listing page for Users
├── router/                   # App routing configuration
├── services/                 # API integration and business logic
├── store/                    # Redux slices and middleware
├── styles/                   # SCSS/Tailwind/global styles
├── types/                    # Global/shared TypeScript types
├── utils/                    # Utility functions and helpers
```

---

## 🔁 Dynamic Routing System

We use a utility method called `createEntityRoutes` to dynamically load routes for entities like `users`, `orders`, etc. using `React.lazy()` to enable code-splitting:

```ts
const createEntityRoutes = (entity: string) => {
  let routes = [] ;

  const EntityRoute = lazy(() =>
    import(`@/pages/${capitalizeFirstLetter(entity)}/index.tsx`)
  );

  routes.push({
    path: `/${entity}`,
    element: <EntityRoute />,
    requiredAuth: true
  });

  const SingleEntityRoute = lazy(() =>
    import(`@/components/pagesComponents/${entity}/index.tsx`)
  );

  routes.push(...[
    {
      path: `/${entity}/add`,
      element: <SingleEntityRoute />,
      requiredAuth: true
    },
    {
      path: `/${entity}/edit/:id`,
      element: <SingleEntityRoute />,
      requiredAuth: true
    }
  ]);

  return routes;
};
```

### ➕ To add a new page entity:

Create:

```
src/pages/MyEntity/index.tsx                     ← main page
src/components/pagesComponents/myEntity/index.tsx ← add/edit form
```

Then include it via:

```ts
createEntityRoutes('myEntity')
```

> 🧠 **Hint for Contributors:** Stick to the same pattern and always create files in the exact structure to ensure routing works seamlessly.

---

## 📦 Getting Started

```bash
npm install
npm run dev
```

## ✅ Linting and Formatting

We use `eslint`, `prettier`, and strict TypeScript checks. Run:

```bash
npm run lint
```

## 👥 Contributing Guidelines

* Please follow the folder structure outlined above.
* Keep code modular and reusable.
* Stick to functional components and hooks.
* Use SOLID principles when structuring logic and components.

---

