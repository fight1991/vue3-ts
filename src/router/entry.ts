const modules = import.meta.glob('../views/**/routes.ts', {
  eager: true,
  import: 'default',
})
const mainRoutesPaths = Object.keys(modules)
  .map((key) => {
    const routes = modules[key] || {}
    const routesList = Array.isArray(routes) ? routes : [routes]
    return routesList
  })
  .flat()

export default mainRoutesPaths
