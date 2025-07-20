
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Bell,
  Home,
  LineChart,
  Package2,
  Search,
  Users,
  FolderKanban,
  PlusCircle,
  AlertCircle,
  CalendarClock
} from 'lucide-react';

import type { Project, AiSuggestion, Notification as NotificationType, User } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
} from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CreateProjectDialog } from '@/components/create-project-dialog';
import { Logo } from '@/components/logo';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

interface SidebarLayoutProps {
  projects: (Project & { completionPercentage: number })[];
  notifications: NotificationType[];
  users: User[];
  children: React.ReactNode;
}

export function SidebarLayout({ projects, notifications, children }: SidebarLayoutProps) {
  const [isDialogOpen, setDialogOpen] = React.useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const notificationIcons = {
    deadline: CalendarClock,
    overdue: AlertCircle,
  };
  
  const navItems = [
    { href: '/dashboard', icon: Home, label: 'Dashboard' },
    { href: '/projects', icon: FolderKanban, label: 'Projects', badge: projects.length },
    { href: '/team', icon: Users, label: 'Team Members' },
    { href: '/analytics', icon: LineChart, label: 'Analytics' },
  ];
  
  const onProjectCreated = () => {
    setDialogOpen(false);
    router.refresh();
  };


  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2">
                <Logo className="text-primary" />
                <h1 className="text-lg font-semibold font-headline text-primary-foreground">Proactive</h1>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <Link href={item.href}>
                    <SidebarMenuButton isActive={pathname === item.href}>
                        <item.icon />
                        <span>{item.label}</span>
                      {item.badge !== undefined && <Badge className="ml-auto">{item.badge}</Badge>}
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
             <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start gap-2 px-2">
                   <Avatar className="h-8 w-8">
                      <AvatarImage src="https://placehold.co/32x32" alt="User" data-ai-hint="person" />
                      <AvatarFallback>PM</AvatarFallback>
                    </Avatar>
                    <div className="text-left">
                        <p className="font-medium text-sm">Project Manager</p>
                        <p className="text-xs text-muted-foreground">manager@proactive.com</p>
                    </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="right" align="start">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset>
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 md:px-6">
            <div className="relative ml-auto flex-1 md:grow-0">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
              />
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="icon" className="relative shrink-0">
                  <Bell className="h-5 w-5" />
                  <span className="sr-only">Toggle notifications</span>
                   {notifications.length > 0 && (
                      <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                      </span>
                    )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80" align="end">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Notifications</h4>
                    <p className="text-sm text-muted-foreground">
                      You have {notifications.length} new messages.
                    </p>
                  </div>
                  <div className="grid gap-2">
                    {notifications.map((notif) => {
                       const Icon = notificationIcons[notif.type];
                       return (
                        <div key={notif.id} className="grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                           <span className={cn("flex h-2 w-2 translate-y-1.5 rounded-full", notif.type === 'overdue' ? 'bg-destructive' : 'bg-primary')} />
                           <div className="grid gap-1">
                             <p className="text-sm font-medium">
                               {notif.type === 'overdue' ? 'Overdue:' : 'Due soon:'} {notif.taskTitle}
                             </p>
                             <p className="text-sm text-muted-foreground">
                                In <strong>{notif.projectName}</strong>. Due {formatDistanceToNow(notif.dueDate, { addSuffix: true })}.
                             </p>
                           </div>
                         </div>
                       )
                    })}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            <Button onClick={() => setDialogOpen(true)} className="hidden sm:flex items-center gap-2">
              <PlusCircle className="h-5 w-5" />
              <span className="font-semibold">Create Project</span>
            </Button>
          </header>

          <main className="flex-1">
              {children}
          </main>
        </SidebarInset>
      </div>
      <CreateProjectDialog open={isDialogOpen} onOpenChange={setDialogOpen} onProjectCreated={onProjectCreated} />
    </SidebarProvider>
  );
}
