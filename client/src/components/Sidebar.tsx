const Sidebar:React.Fc = () => {
    const sidebarElements  = [
        {
            title:"Dashboard",
            icon:"<i></i>",
            redirectTo:"/dashbard"
        },
        {
            title:"Profile",
            icon:"<i></i>",
            redirectTo:"/profile"
        },
        {
            title:"Settings",
            icon:"<i></i>",
            redirectTo:"/settings"
        },
        {
            title:"Logout",
            icon:"<i></i>",
            redirectTo:"/logout"
        },
    ]
    return (
        <div>
            {sidebarElements.map((element, index) => (
                <SidebarElement key={index} metadata={element} />
            ))}
        </div>
    )
}



export const SidebarElement:React.FC<{metadata:{
    title: string;
    redirectTo: string;
    icon: React.ReactNode
}}> = ({metadata}) => {
    <a>
       {metadata.icon}
       <span>{metadata.title}</span>
    </a>
}