import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Specialties } from './components/Specialties'
import { About } from './components/About'
import { Portfolio } from './components/Portfolio'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { ThemeProvider } from './context/ThemeContext'

function App() {
  return (
    <ThemeProvider>
      <Header />
      <main>
        <Hero />
        <Specialties />
        <About />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </ThemeProvider>
  )
}

export default App
