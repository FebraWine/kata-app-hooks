import { createRoot } from 'react-dom/client'

import App from './components/app/app'

const container = document.getElementById('root')
const wrapper = createRoot(container)

wrapper.render(<App />)
