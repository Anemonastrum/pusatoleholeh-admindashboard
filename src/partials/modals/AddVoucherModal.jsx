import React from 'react';
import Transition from '../../utils/Transition';

function AddVoucherModal({
  modalOpen,
  setModalOpen,
  onSubmit,
  newVoucher,
  setNewVoucher,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <>
      {/* Modal Backdrop */}
      <Transition
        className="fixed inset-0 bg-gray-900 bg-opacity-30 z-50 transition-opacity"
        show={modalOpen}
        enter="transition ease-out duration-200"
        enterStart="opacity-0"
        enterEnd="opacity-100"
        leave="transition ease-out duration-100"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
        aria-hidden="true"
      />
      
      {/* Modal Dialog */}
      <Transition
        className="fixed inset-0 z-50 overflow-hidden flex items-center my-4 justify-center px-4 sm:px-6"
        show={modalOpen}
        enter="transition ease-in-out duration-200"
        enterStart="opacity-0 translate-y-4"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-in-out duration-200"
        leaveStart="opacity-100 translate-y-0"
        leaveEnd="opacity-0 translate-y-4"
      >
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-auto max-w-lg w-full max-h-full">
          {/* Modal header */}
          <div className="px-5 py-3 border-b border-gray-200 dark:border-gray-700/60">
            <div className="flex justify-between items-center">
              <div className="font-semibold text-gray-800 dark:text-gray-100">Add New Voucher</div>
              <button className="text-gray-400 hover:text-gray-500" onClick={() => setModalOpen(false)}>
                <div className="sr-only">Close</div>
                <svg className="w-4 h-4 fill-current">
                  <path d="M7.95 6.536l4.242-4.243a1 1 0 111.415 1.414L9.364 7.95l4.243 4.242a1 1 0 11-1.415 1.415L7.95 9.364l-4.243 4.243a1 1 0 01-1.414-1.415L6.536 7.95 2.293 3.707a1 1 0 011.414-1.414L7.95 6.536z" />
                </svg>
              </button>
            </div>
          </div>
          {/* Modal content */}
          <div className="px-5 py-4">
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                {/* Voucher Code */}
                <div>
                  <label className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-1" htmlFor="code">
                    Voucher Code
                  </label>
                  <input
                    id="code"
                    className="form-input w-full px-2 py-1 rounded-lg border border-gray-300 dark:border-gray-700/60 bg-white dark:bg-gray-800"
                    type="text"
                    required
                    value={newVoucher.code}
                    onChange={(e) => setNewVoucher({ ...newVoucher, code: e.target.value })}
                    placeholder="e.g., SUMMER2025"
                  />
                </div>
                {/* Voucher Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-1" htmlFor="type">
                    Voucher Type
                  </label>
                  <select
                    id="type"
                    className="form-select w-full px-2 py-1 rounded-lg border border-gray-300 dark:border-gray-700/60 bg-white dark:bg-gray-800"
                    value={newVoucher.type}
                    onChange={(e) => setNewVoucher({ ...newVoucher, type: e.target.value })}
                    required
                  >
                    <option value="">Select type</option>
                    <option value="percentage">Percentage Discount</option>
                  </select>
                </div>
                {/* Discount Value */}
                <div>
                  <label className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-1" htmlFor="value">
                    {newVoucher.type === 'percentage' ? 'Discount Percentage' : 'Discount Amount'}
                  </label>
                  <div className="relative">
                    <input
                      id="value"
                      className="form-input w-full px-2 py-1 rounded-lg border border-gray-300 dark:border-gray-700/60 bg-white dark:bg-gray-800"
                      type="number"
                      min="0"
                      max={newVoucher.type === 'percentage' ? "100" : undefined}
                      required
                      value={newVoucher.value}
                      onChange={(e) => setNewVoucher({ ...newVoucher, value: e.target.value })}
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      {newVoucher.type === 'percentage' ? '%' : '$'}
                    </span>
                  </div>
                </div>
                {/* Minimum Purchase */}
                <div>
                  <label className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-1" htmlFor="minPurchase">
                    Minimum Purchase Amount
                  </label>
                  <div className="relative">
                    <input
                      id="minPurchase"
                      className="form-input w-full px-2 py-1 rounded-lg border border-gray-300 dark:border-gray-700/60 bg-white dark:bg-gray-800"
                      type="number"
                      min="0"
                      required
                      value={newVoucher.minPurchase}
                      onChange={(e) => setNewVoucher({ ...newVoucher, minPurchase: e.target.value })}
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  </div>
                </div>
                {/* Validity Period */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-1" htmlFor="startDate">
                      Start Date
                    </label>
                    <input
                      id="startDate"
                      className="form-input w-full px-2 py-1 rounded-lg border border-gray-300 dark:border-gray-700/60 bg-white dark:bg-gray-800"
                      type="date"
                      required
                      value={newVoucher.startDate}
                      onChange={(e) => setNewVoucher({ ...newVoucher, startDate: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-1" htmlFor="endDate">
                      End Date
                    </label>
                    <input
                      id="endDate"
                      className="form-input w-full px-2 py-1 rounded-lg border border-gray-300 dark:border-gray-700/60 bg-white dark:bg-gray-800"
                      type="date"
                      required
                      value={newVoucher.endDate}
                      onChange={(e) => setNewVoucher({ ...newVoucher, endDate: e.target.value })}
                    />
                  </div>
                </div>
                {/* Usage Limit */}
                <div>
                  <label className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-1" htmlFor="usageLimit">
                    Usage Limit
                  </label>
                  <input
                    id="usageLimit"
                    className="form-input w-full px-2 py-1 rounded-lg border border-gray-300 dark:border-gray-700/60 bg-white dark:bg-gray-800"
                    type="number"
                    min="1"
                    required
                    value={newVoucher.usageLimit}
                    onChange={(e) => setNewVoucher({ ...newVoucher, usageLimit: e.target.value })}
                  />
                </div>
                {/* Active Status */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="active"
                    className="form-checkbox"
                    checked={newVoucher.active}
                    onChange={(e) => setNewVoucher({ ...newVoucher, active: e.target.checked })}
                  />
                  <label className="text-sm text-gray-800 dark:text-gray-300 ml-2" htmlFor="active">
                    Active
                  </label>
                </div>
              </div>
              <div className="flex items-center justify-end mt-6">
                <button
                  type="button"
                  className="btn-sm border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 text-gray-600 dark:text-gray-300"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-sm bg-violet-500 hover:bg-violet-600 text-white ml-3"
                >
                  Add Voucher
                </button>
              </div>
            </form>
          </div>
        </div>
      </Transition>
    </>
  );
}

export default AddVoucherModal;
