import React from 'react';
import SideBar from '../components/Sidebar';

const NoPermission = () => {
  return (
    <SideBar>

    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-900">Access Denied</h2>
        <p className="mt-2 text-gray-600">You do not have permission to view this page.</p>
      </div>
    </div>
    </SideBar>
  );
};

export default NoPermission;
