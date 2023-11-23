import TicketDashboard from '../Components/TicketDashboard.js';
import AdminUsers from '../Components/AdminUsers.js';




export default function Admin ({ user }) {


    return (
        <>
            {user?.power === 'admin' && (
                <>
                    <TicketDashboard />
                    <AdminUsers />
                </>
            )}
        </>
    )
}