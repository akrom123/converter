import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Layout.module.css'
interface LayoutProps {
  children: React.ReactNode;
}


export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <header>
        <nav className={styles.nav}>
          <Link to="/">Converter</Link> |
          <Link to="/rates">Rates</Link>
        </nav>
      </header>
      {children}
    </div>
  )
}