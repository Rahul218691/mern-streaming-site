import { randomNumber } from "utils"

const unAuthorizedRoutes = [
        {
            id: randomNumber(),
            title: 'Home',
            icon: 'home',
            path: '/'
        },
        {
            id: randomNumber(),
            title: 'Podcasts',
            icon: 'podcasts',
            path: '/podcasts'
        },
        {
            id: randomNumber(),
            title: 'Live Stream',
            icon: 'live_tv',
            path: '/liveStream'
        }
]

export const SideMenuList = (isAuthenticated) => {
     const routes = [...unAuthorizedRoutes]
     if (isAuthenticated) {
        routes.push({
            id: randomNumber(),
            title: 'Logout',
            icon: 'logout',
            path: '',
            isLogoutRoute: true
        })
     } else {
        routes.push({
            id: randomNumber(),
            title: 'Login',
            icon: 'login',
            path: '/login'
        })
     }

     return routes
}
