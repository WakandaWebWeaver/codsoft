import { SidebarLayout } from '@/components/sidebar-layout';
import { getProjects, getNotifications, getUsers } from '@/lib/data';

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const projects = await getProjects();
  const notifications = await getNotifications();
  const users = await getUsers();

  return (
    <SidebarLayout projects={projects} notifications={notifications} users={users}>
        {children}
    </SidebarLayout>
  );
}
