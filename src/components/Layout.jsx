import { Outlet } from 'react-router-dom';

const Layout = () => (
    <div>
        <main className="container">
            <div>
                <Outlet />
            </div>
        </main>
    </div>
);

export default Layout;