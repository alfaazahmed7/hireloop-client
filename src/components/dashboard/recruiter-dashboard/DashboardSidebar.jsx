import { getUserSession } from "@/lib/core/session";
import { Bars, Bell, Envelope, Gear, House, Magnifier, Briefcase, Person } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import Link from "next/link";
import {
    LuLayoutDashboard,
    LuSearch,
    LuBookmark,
    LuFileText,
    LuCreditCard,
    LuSettings
} from "react-icons/lu";
import {
    LuUsers,
    LuBuilding2,
    LuBriefcase,
} from "react-icons/lu";

export async function DashboardSidebar() {
    const recruiterNavLinks = [
        { icon: House, href: '/dashboard/recruiter', label: "Home" },
        { icon: Magnifier, href: '/dashboard/recruiter/jobs', label: "Jobs" },
        { icon: Bell, href: '/dashboard/recruiter/jobs/new', label: "Create Job" },
        { icon: Briefcase, href: '/dashboard/recruiter/company', label: "Company Profile" },
        { icon: Envelope, href: '/message', label: "Messages" },
        { icon: Person, href: '/profile', label: "Profile" },
        { icon: Gear, href: '/settings', label: "Settings" },
    ];

    const seekerNavLinks = [
        { icon: LuLayoutDashboard, href: '/dashboard/seeker', label: "Dashboard" },
        { icon: LuSearch, href: '/dashboard/seeker/jobs', label: "Jobs" },
        { icon: LuBookmark, href: '/dashboard/seeker/saved', label: "Saved Jobs" },
        { icon: LuFileText, href: '/dashboard/seeker/applications', label: "Applications" },
        { icon: LuCreditCard, href: '/dashboard/seeker/billing', label: "Billing" },
        { icon: LuSettings, href: '/dashboard/seeker/settings', label: "Settings" },
    ];

    const adminNavLinks = [
        { icon: LuLayoutDashboard, href: '/dashboard/admin', label: "Dashboard" },
        { icon: LuUsers, href: '/dashboard/admin/users', label: "Users" },
        { icon: LuBuilding2, href: '/dashboard/admin/companies', label: "Companies" },
        { icon: LuBriefcase, href: '/dashboard/admin/jobs', label: "Jobs" },
        { icon: LuCreditCard, href: '/dashboard/admin/payments', label: "Payments" },
        { icon: LuSettings, href: '/dashboard/admin/settings', label: "Settings" },
    ];

    const navLinkMap = {
        seeker: seekerNavLinks,
        recruiter: recruiterNavLinks,
        admin: adminNavLinks,
    }

    const user = await getUserSession();

    const navItems = navLinkMap[user?.role || 'seeker'];

    const navContent =
        <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
                <Link
                    key={item.label}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm  transition-colors hover:bg-default text-white hover:text-black"
                    type="button"
                    href={item.href}
                >
                    <item.icon className="size-5 text-muted" />
                    {item.label}
                </Link>
            ))}
        </nav>

    return (
        <>
            <aside className="hidden w-64 shrink-0 border-r border-default p-4 lg:block ">
                {navContent}
            </aside>

            <Drawer>
                <Button className="lg:hidden" variant="secondary">
                    <Bars />
                    Menu
                </Button>
                <Drawer.Backdrop>
                    <Drawer.Content placement="left" className="z-50">
                        <Drawer.Dialog className="bg-[#131314]">
                            <Drawer.CloseTrigger />
                            <Drawer.Header>
                                <Drawer.Heading className="text-white">Navigation</Drawer.Heading>
                            </Drawer.Header>
                            <Drawer.Body>
                                {navContent}
                            </Drawer.Body>
                        </Drawer.Dialog>
                    </Drawer.Content>
                </Drawer.Backdrop>
            </Drawer>
        </>
    );
}