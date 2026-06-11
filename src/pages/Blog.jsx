import React, { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import '../styles/blog.css'

function useQuery(){
  const { search } = useLocation()
  return useMemo(() => new URLSearchParams(search), [search])
}

const SAMPLE_POSTS = [
  { id: 1, title: 'Getting started with web dev', excerpt: 'A short intro to building websites.' },
  { id: 2, title: 'My thoughts on JavaScript', excerpt: 'Notes and tips about JS.' },
  { id: 3, title: 'Writing accessible components', excerpt: 'Best practices for accessible UI.' }
]

export default function Blog(){
  const query = useQuery()
  const q = (query.get('search') || '').toLowerCase().trim()

  const posts = useMemo(() => {
    if (!q) return SAMPLE_POSTS
    return SAMPLE_POSTS.filter(p => (p.title + ' ' + p.excerpt).toLowerCase().includes(q))
  }, [q])

  return (
    <section className="container">
      <h1>Articles</h1>
      <p className="blog-intro">Thoughtful notes on web development, accessibility, and the practical side of building modern user experiences.</p>
      {q && <p>Showing results for "{q}"</p>}
      {posts.length === 0 && <p>No posts found. More articles are coming soon.</p>}
      {posts.map(p => (
        <article key={p.id} className="post">
          <h3>{p.title}</h3>
          <p>{p.excerpt}</p>
        </article>
      ))}
    </section>
  )
}
