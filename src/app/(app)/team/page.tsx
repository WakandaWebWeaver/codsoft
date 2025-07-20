import { getUsers } from '@/lib/data';
import { TeamMembersTable } from '@/components/team-members-table';

export default async function TeamPage() {
  const users = await getUsers();

  return (
    <div className="flex-1 space-y-4 p-4 md:p-6">
      <h1 className="text-xl font-semibold md:text-2xl font-headline">Team Members</h1>
      <TeamMembersTable data={users} />
    </div>
  );
}
