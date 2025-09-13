# 📚 Blog Personal - Next.js 15

Un blog personal completo desarrollado con Next.js 15, TypeScript, Ant Design y React Query.

## ✨ Características

- 🚀 **Next.js 15** con App Router
- 🎨 **Ant Design v5** con temas claro/oscuro
- 🔐 **Autenticación JWT** con refresh automático
- 📝 **Editor Markdown** con vista previa en tiempo real
- 🗄️ **React Query** para gestión de estado del servidor
- 📱 **Diseño responsive** y moderno
- 🛡️ **TypeScript** para type safety
- 🎯 **Arquitectura escalable** y bien estructurada

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js 18+
- npm o yarn
- Backend API ejecutándose en `http://localhost:3000`

### Instalación

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd BLOG-FRONT-NEXT
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp .env.local.example .env.local
# Editar .env.local con tus configuraciones
```

4. **Ejecutar en desarrollo**
```bash
npm run dev
```

5. **Abrir en el navegador**
```
http://localhost:3001
```

### Scripts Disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Build de producción
- `npm run start` - Servidor de producción
- `npm run lint` - Linter ESLint
- `npm run type-check` - Verificación de tipos TypeScript

## 🔐 Credenciales de Demo

Para probar la aplicación, utiliza estas credenciales:

- **Email:** `admin@blog.com`
- **Contraseña:** `admin123456`

## 📁 Estructura del Proyecto

```
src/
├── app/                    # App Router (Next.js 15)
│   ├── admin/             # Panel administrativo
│   ├── login/             # Página de login
│   ├── posts/[id]/        # Páginas de posts dinámicas
│   └── layout.tsx         # Layout principal
├── components/            # Componentes React
│   ├── admin/             # Componentes del admin
│   ├── auth/              # Componentes de autenticación
│   ├── blog/              # Componentes del blog
│   ├── common/            # Componentes comunes
│   └── markdown/          # Editor y preview Markdown
├── hooks/                 # Custom hooks
│   ├── mutations/         # React Query mutations
│   └── queries/           # React Query queries
├── lib/                   # Librerías y utilidades
│   ├── api/               # Cliente API y servicios
│   ├── auth/              # Lógica de autenticación
│   └── utils/             # Utilidades generales
├── providers/             # Context providers
├── styles/                # Estilos CSS
├── types/                 # Definiciones TypeScript
└── globals.css           # Estilos globales
```

## 🔧 Configuración

### Variables de Entorno

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### Temas

La aplicación soporta temas claro y oscuro que se pueden alternar desde la interfaz. El tema se guarda en localStorage.

### Autenticación

- Sistema JWT con access tokens y refresh tokens
- Refresh automático de tokens expirados
- Rutas protegidas con middleware
- Gestión de permisos por usuario

## 🛠️ API Integration

La aplicación se integra con un backend que debe exponer estos endpoints:

### Autenticación
- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/logout` - Cerrar sesión
- `POST /api/auth/refresh` - Renovar tokens
- `GET /api/auth/me` - Obtener usuario actual

### Posts
- `GET /api/posts` - Listar posts
- `GET /api/posts/:id` - Obtener post por ID
- `POST /api/posts` - Crear post (autenticado)
- `PUT /api/posts/:id` - Actualizar post (autenticado)
- `DELETE /api/posts/:id` - Eliminar post (autenticado)

## 📝 Funcionalidades

### Panel Público
- ✅ Lista de posts en formato de tarjetas
- ✅ Vista detallada de posts individuales
- ✅ Renderizado de Markdown con sintaxis highlighting
- ✅ Diseño responsive
- ✅ Tema claro/oscuro

### Panel Administrativo
- ✅ Dashboard con estadísticas
- ✅ CRUD completo de posts
- ✅ Editor Markdown con vista previa
- ✅ Gestión de usuarios y permisos
- ✅ Búsqueda y filtrado de posts

### Características Técnicas
- ✅ Server Side Rendering (SSR)
- ✅ Optimización de imágenes con Next.js
- ✅ Code splitting automático
- ✅ React Query para caché optimizado
- ✅ Error boundaries y manejo de errores
- ✅ Loading states y UX optimizada

## 🚢 Deployment

### Build de Producción

```bash
npm run build
npm run start
```

### Docker (Opcional)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 🙏 Reconocimientos

- [Next.js](https://nextjs.org/) - Framework React
- [Ant Design](https://ant.design/) - UI Components
- [React Query](https://tanstack.com/query) - Data fetching
- [React Markdown](https://github.com/remarkjs/react-markdown) - Markdown rendering
- [Prism](https://prismjs.com/) - Syntax highlighting

---

**Desarrollado con ❤️ usando Next.js 15 y TypeScript**