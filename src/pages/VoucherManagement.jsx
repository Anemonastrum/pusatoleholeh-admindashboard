import React, { useState } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import FilterButton from '../components/DropdownFilter';
import AddVoucherModal from '../partials/modals/AddVoucherModal';

function VoucherManagement() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [vouchers, setVouchers] = useState([
    {
      id: 1,
      code: 'SUMMER25',
      type: 'percentage',
      value: 25,
      minSpend: 100,
      maxDiscount: 50,
      startDate: '2025-01-01',
      endDate: '2025-01-31',
      active: true,
      usageCount: 45,
      maxUsage: 100
    },
    {
      id: 2,
      code: 'WELCOME10',
      type: 'percentage',
      value: 10,
      minSpend: 50,
      maxDiscount: 20,
      startDate: '2025-01-01',
      endDate: '2025-12-31',
      active: true,
      usageCount: 120,
      maxUsage: 500
    },
  ]);
  const [newVoucher, setNewVoucher] = useState({
    code: '',
    type: 'percentage',
    value: '',
    minSpend: '',
    maxDiscount: '',
    startDate: '',
    endDate: '',
    active: true,
    maxUsage: ''
  });

  const handleAddVoucher = () => {
    setIsEditing(false);
    setNewVoucher({
      code: '',
      type: 'percentage',
      value: '',
      minSpend: '',
      maxDiscount: '',
      startDate: '',
      endDate: '',
      active: true,
      maxUsage: ''
    });
    setModalOpen(true);
  };

  const handleEditVoucher = (voucher) => {
    setIsEditing(true);
    setNewVoucher({
      ...voucher,
      startDate: voucher.startDate,
      endDate: voucher.endDate
    });
    setModalOpen(true);
  };

  const handleSubmitVoucher = (e) => {
    e.preventDefault();
    if (isEditing) {
      setVouchers(vouchers.map(voucher => 
        voucher.id === newVoucher.id ? {
          ...newVoucher,
          usageCount: voucher.usageCount
        } : voucher
      ));
    } else {
      const newId = vouchers.length > 0 ? Math.max(...vouchers.map(v => v.id)) + 1 : 1;
      setVouchers([...vouchers, {
        ...newVoucher,
        id: newId,
        usageCount: 0
      }]);
    }
    setModalOpen(false);
    setNewVoucher({
      code: '',
      type: 'percentage',
      value: '',
      minSpend: '',
      maxDiscount: '',
      startDate: '',
      endDate: '',
      active: true,
      maxUsage: ''
    });
  };

  const handleToggleActive = (id) => {
    setVouchers(vouchers.map(voucher => 
      voucher.id === id ? { ...voucher, active: !voucher.active } : voucher
    ));
  };

  const handleDeleteVoucher = (id) => {
    setVouchers(vouchers.filter(voucher => voucher.id !== id));
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Page header */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              {/* Left: Title */}
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Voucher Management</h1>
              </div>

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                <FilterButton align="right" />
                <button className="btn bg-violet-500 hover:bg-violet-600 text-white" onClick={handleAddVoucher}>
                  <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                    <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                  </svg>
                  <span className="hidden xs:block ml-2">Add Voucher</span>
                </button>
              </div>
            </div>

            {/* Vouchers Table */}
            <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl">
              <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
                <h2 className="font-semibold text-gray-800 dark:text-gray-100">All Vouchers <span className="text-gray-400 dark:text-gray-500 font-medium">{vouchers.length}</span></h2>
              </header>
              <div className="p-3">
                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="table-auto w-full dark:text-gray-300">
                    {/* Table header */}
                    <thead className="text-xs uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700/20">
                      <tr>
                        <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                          <div className="font-semibold text-left">Code</div>
                        </th>
                        <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                          <div className="font-semibold text-left">Type</div>
                        </th>
                        <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                          <div className="font-semibold text-left">Value</div>
                        </th>
                        <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                          <div className="font-semibold text-left">Min Spend</div>
                        </th>
                        <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                          <div className="font-semibold text-left">Usage</div>
                        </th>
                        <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                          <div className="font-semibold text-left">Valid Until</div>
                        </th>
                        <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                          <div className="font-semibold text-left">Status</div>
                        </th>
                        <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                          <div className="font-semibold text-right">Actions</div>
                        </th>
                      </tr>
                    </thead>
                    {/* Table body */}
                    <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700">
                      {vouchers.map(voucher => (
                        <tr key={voucher.id}>
                          <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                            <div className="font-medium text-gray-800 dark:text-gray-100">{voucher.code}</div>
                          </td>
                          <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                            <div className="capitalize">{voucher.type}</div>
                          </td>
                          <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                            <div>{voucher.value}{voucher.type === 'percentage' ? '%' : ''}</div>
                          </td>
                          <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                            <div>${voucher.minSpend}</div>
                          </td>
                          <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                            <div>{voucher.usageCount} / {voucher.maxUsage}</div>
                          </td>
                          <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                            <div>{voucher.endDate}</div>
                          </td>
                          <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                            <button
                              onClick={() => handleToggleActive(voucher.id)}
                              className={`px-3 py-1 rounded-full text-sm ${
                                voucher.active 
                                  ? 'bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-400'
                                  : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                              }`}
                            >
                              {voucher.active ? 'Active' : 'Inactive'}
                            </button>
                          </td>
                          <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                            <div className="flex items-center justify-end space-x-3">
                              <button
                                onClick={() => handleEditVoucher(voucher)}
                                className="text-gray-400 hover:text-gray-500"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </button>
                              <button
                                onClick={() => handleDeleteVoucher(voucher.id)}
                                className="text-red-500 hover:text-red-600"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Add/Edit Voucher Modal */}
      <AddVoucherModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        onSubmit={handleSubmitVoucher}
        newVoucher={newVoucher}
        setNewVoucher={setNewVoucher}
        isEditing={isEditing}
      />
    </div>
  );
}

export default VoucherManagement;
