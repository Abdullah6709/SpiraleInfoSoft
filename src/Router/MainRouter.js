import React, { Suspense, lazy } from 'react';

// Lazy load the PublicRoutes component
const PublicRoutes = lazy(() => import('./Routes/PublicRoutes'));

const MainRouter = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PublicRoutes />
        </Suspense>
    );
}

export default MainRouter;
