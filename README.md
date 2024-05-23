Inicialización del Proyecto con React

git clone https://github.com/CarlosMH0314/tracker-ia.git
cd tracker-ia

Inicializar un nuevo proyecto de React:

Usar create-react-app para inicializar el proyecto:

npx create-react-app cryptotracker

cd cryptotracker
Configurar el repositorio Git:

Añadir los archivos generados y hacer el primer commit:
bash
Copiar código
git add .
git commit -m "Initial commit with create-react-app"
git push origin main

2. Configuración de Visual Studio Code (VS Code)
Abrir el proyecto en VS Code:
Navegar a la carpeta del proyecto y abrirla en VS Code:
code .


Instalar las extensiones recomendadas:
ESLint para el linting del código.
Prettier para el formateo del código.
Material-UI Snippets para snippets de código de Material-UI.

3. Implementación de Material-UI

Instalar Material-UI y sus dependencias:
Copiar código
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/icons-material
