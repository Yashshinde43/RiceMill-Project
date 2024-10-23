'use client'

import React, { useEffect, useState } from "react";
// import { useState } from 'react'
import { useNavigate } from 'react-router-dom' // Import useNavigate
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'
import Layout from './Layout'

export default function AwakOption() {
  const [open, setOpen] = useState(true)
  const navigate = useNavigate() // Initialize useNavigate

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleClose = () => {
    setOpen(false)
    navigate('/dashboard') // Redirect to the dashboard
  }

  return (
    <Layout>
    <Dialog open={open} onClose={() => setOpen(false)} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-4xl sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
              <div className="flex-1 flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-md">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <CheckIcon aria-hidden="true" className="h-8 w-8 text-green-600" />
                </div>
                <div className="mt-4 text-center cursor-pointer">
                  <DialogTitle as="h3" className="text-xl font-semibold leading-6 text-gray-900">
                    Dhan Awak
                  </DialogTitle>
                  <p className="text-base text-gray-600 mt-2">
                    Dhan Awak is a premium option designed for those who seek high quality and reliability in their operations. This option comes with advanced features and a robust support system.
                  </p>
                </div>
              </div>
              <div className="flex-1 flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-md">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <CheckIcon aria-hidden="true" className="h-8 w-8 text-green-600" />
                </div>
                <div className="mt-4 text-center cursor-pointer">
                  <DialogTitle as="h3" className="text-xl font-semibold leading-6 text-gray-900">
                    Other Awak
                  </DialogTitle>
                  <p className="text-base text-gray-600 mt-2">
                    Other Awak provides a versatile solution with various features that cater to different needs. It is ideal for those looking for flexibility and a wide range of options.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-center">
              <button
                type="button"
                onClick={handleClose} // Call handleClose on click
                className="inline-flex justify-center rounded-md bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Close
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
    </Layout>
  )
}
