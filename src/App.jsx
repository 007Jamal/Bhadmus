import { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import BottomNav from './components/BottomNav.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'

// Lazy-loaded: only fetched when someone actually visits these routes,
// keeping the initial homepage bundle smaller.
const ProjectDetail = lazy(() => import('./pages/ProjectDetail.jsx'))
const BlogPost = lazy(() => import('./pages/BlogPost.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))

export default function App() {
  return (
    <div className="min-h-screen w-full bg-bg text-ink font-sans overflow-x-hidden pb-28 flex flex-col">
      <div className="flex-1">
        <Suspense fallback={<div className="pt-24 text-center text-muted text-sm">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Navigate to="/#projects" replace />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="/blog" element={<Navigate to="/#blog" replace />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
      <Footer />
      <BottomNav />
    </div>
  )
}
