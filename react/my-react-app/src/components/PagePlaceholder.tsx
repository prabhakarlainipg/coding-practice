type PagePlaceholderProps = { title: string; topic: string }

export function PagePlaceholder({ title, topic }: PagePlaceholderProps) {
  return (
    <section className="placeholder" aria-labelledby="page-heading">
      <p className="eyebrow">Upcoming feature</p>
      <h1 id="page-heading">{title}</h1>
      <p>{topic}</p>
    </section>
  )
}
