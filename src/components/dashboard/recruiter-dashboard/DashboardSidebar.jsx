import { Bars, Bell, Envelope, Gear, House, Magnifier, Person } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import Link from "next/link";

export function DashboardSidebar() {
    const navItems = [
        { icon: House, href: '/dashboard/recruiter', label: "Home" },
        { icon: Magnifier, href: '/dashboard/recruiter/jobs', label: "Jobs" },
        { icon: Bell, href: '/dashboard/recruiter/jobs/new', label: "Create Job" },
        { icon: Envelope, href: '/message', label: "Messages" },
        { icon: Person, href: '/profile', label: "Profile" },
        { icon: Gear, href: '/settings', label: "Settings" },
    ];

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