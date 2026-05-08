# Click Clack Copy Generator

Un sistema inteligente que genera copy de marca para mensajes de tarjetas a huéspedes. Utiliza IA para mantener el tono y personalidad de Click Clack Hotels en cada mensaje.

## Características

✅ **3 campos de entrada:**
- Tipo de mensaje (Bienvenida, Agradecimiento, Despedida, Cumpleaños, Cortesía, Disculpa, Upgrade, Ocasión especial, Recuperación)
- Notas/Detalles opcionales para personalización
- Idioma (Español e Inglés)

✅ **3 opciones de copy** generadas automáticamente (20-40 palabras cada una)
✅ **Copia con un click** al portapapeles
✅ **Diseño sofisticado** alineado con la marca

---

## 🚀 DESPLIEGUE EN VERCEL (LO MÁS FÁCIL)

### Paso 1: Prepara los archivos
```bash
git clone <tu-repo>
cd click-clack-copy-generator
```

### Paso 2: Ve a Vercel
1. Abre https://vercel.com
2. Haz login con GitHub / Google
3. Clickea "New Project"
4. Selecciona este repositorio
5. Configura la variable de entorno:
   - **ANTHROPIC_API_KEY**: Tu clave de API de Anthropic

### Paso 3: Deploy
Vercel hace build y deploy automáticamente. ¡Tu URL está lista!

---

## 📋 ESTRUCTURA DE ARCHIVOS

```
.
├── pages/
│   ├── _app.js                 # Configuración de Next.js
│   ├── index.jsx               # Componente principal
│   └── api/
│       └── generate-copy.js    # Endpoint para generar copy
├── styles/
│   └── globals.css             # Estilos Tailwind
├── package.json                # Dependencias
├── next.config.js              # Configuración Next
├── tailwind.config.js          # Configuración Tailwind
├── postcss.config.js           # Configuración PostCSS
├── .env.local                  # Variables de entorno (NO COMMIT)
└── README.md                   # Este archivo
```

---

## 🔧 INSTALACIÓN LOCAL (Para desarrollo)

### Requisitos
- Node.js 18+
- npm o yarn

### Pasos

1. **Clona o descarga el proyecto**
```bash
git clone <tu-repo>
cd click-clack-copy-generator
```

2. **Instala dependencias**
```bash
npm install
```

3. **Configura tu API Key**
Crea un archivo `.env.local` en la raíz:
```
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxx
```

4. **Inicia el servidor de desarrollo**
```bash
npm run dev
```

5. **Abre en navegador**
```
http://localhost:3000
```

---

## 🎯 USO

1. Selecciona el tipo de mensaje
2. (Opcional) Agrega notas/detalles en el campo de notas
3. Elige idioma (Español/Inglés)
4. Haz click en "Generar Copy"
5. Haz click en cualquier opción para copiar al portapapeles
6. ¡Pega en tu tarjeta!

---

## 🔑 OBTENER CLAVE DE ANTHROPIC API

1. Abre https://console.anthropic.com
2. Haz login / Crea cuenta
3. Ve a "API Keys"
4. Crea una nueva clave
5. Copia y pégala en `.env.local`

---

## 📦 VARIABLES DE ENTORNO

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `ANTHROPIC_API_KEY` | Clave de API de Anthropic | `sk-ant-xxxxx` |

---

## 🏗️ STACK TECNOLÓGICO

- **Frontend**: React 18, Next.js 14
- **Styling**: Tailwind CSS
- **Backend**: Next.js API Routes
- **IA**: Claude API (Anthropic)
- **Deploy**: Vercel (recomendado)

---

## 🐛 TROUBLESHOOTING

### El sitio no carga
- Verifica que `ANTHROPIC_API_KEY` esté configurada en Vercel
- En desarrollo local, revisa que `.env.local` existe

### El copy no se genera
- Verifica que tu API Key es válida
- Revisa la consola del navegador para mensajes de error
- Asegúrate de que tienes saldo/crédito en Anthropic

### Error "Method not allowed"
- Asegúrate de que estás haciendo POST a `/api/generate-copy`
- El frontend debe estar enviando los datos correctamente

---

## 📞 SOPORTE

Si tienes problemas:
1. Revisa los logs en Vercel Dashboard
2. Revisa la consola del navegador (F12)
3. Verifica que todas las variables de entorno están configuradas

---

## 📄 LICENCIA

Privado - Click Clack Hotels

---

**¡Listo para usar!** 🎉
