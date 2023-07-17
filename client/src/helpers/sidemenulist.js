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


export const ADMIN_MENU_LINKS = {
    commonList: [
        {
            id: randomNumber(),
            title: 'Dashboard',
            icon: 'bxs-dashboard',
            path: '/admin/home'
        },
        {
            id: randomNumber(),
            title: 'Artist',
            icon: 'bxs-palette',
            path: '/admin/manage_artist'
        },
        {
            id: randomNumber(),
            title: 'Analytics',
            icon: 'bxs-doughnut-chart',
            path: ''
        },
        {
            id: randomNumber(),
            title: 'My Store',
            icon: 'bxs-shopping-bag-alt',
            path: ''
        },
        {
            id: randomNumber(),
            title: 'Message',
            icon: 'bxs-message-dots',
            path: ''
        },
        {
            id: randomNumber(),
            title: 'Team',
            icon: 'bxs-group',
            path: ''
        }
    ],
    settingsList: [
        {
            id: randomNumber(),
            title: 'Settings',
            icon: 'bxs-cog',
            path: ''
        },
        {
            id: randomNumber(),
            title: 'Logout',
            icon: 'bxs-log-out-circle',
            path: ''
        }
    ]
}