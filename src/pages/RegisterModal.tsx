import React, { Fragment, FunctionComponent, PropsWithChildren } from "react";
import { Dialog, Transition } from "@headlessui/react";
import ShowIcon from "../icons/ShowIcon";
import CloseIcon from "../icons/CloseIcon";

const RegisterModal: FunctionComponent<
  PropsWithChildren<{
    className?: string;
    isOpen?: boolean;
    onClose?: () => void;
  }>
> = ({
       className, isOpen = false, onClose = () => {
  }
     }) => (
  <Transition.Root as={ Fragment } show={ isOpen }>
    <Dialog as="div" className="relative z-[9000]" onClose={ onClose }>
      <Transition.Child
        as={ Fragment }
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-black bg-blur backdrop-blur-sm bg-opacity-50 transition-opacity"/>
      </Transition.Child>
      
      <div className="fixed inset-4 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <Transition.Child
            as={ Fragment }
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <Dialog.Panel className={ `md:w-[28rem] lg:w-[32rem] relative transform overflow-hidden text-left transition-all ${ className }` }>
              <div
                className="flex flex-col items-center space-y-12 justify-center px-6 py-8">
                <div className="w-full shadow border-2 border-gray-500 rounded-lg mt-0">
                  <div className="p-6 space-y-8 bg-container rounded-lg">
                    <div>
                      <div className="flex justify-end">
                        <div className="bg-gray-950 rounded-full p-2">
                          <CloseIcon onClick={onClose}/>
                        </div>
                      </div>
                      <div className="mb-2 text-sm text-center leading-tight tracking-tight text-gray-400">
                        SIGN UP
                      </div>
                      <div className="text-xl font-medium text-center leading-tight tracking-tight text-white">
                        Create an account to continue
                      </div>
                    </div>
                    <form className="space-y-4 md:space-y-6" action="#">
                      <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-300">
                          Email
                        </label>
                        <input type="email" name="email" id="email"
                               className="bg-transparent border border-gray-600  text-gray-300 text-md rounded-lg block w-full p-2.5 "
                               placeholder="Enter your email" required/>
                      </div>
                      <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-300">
                          Username
                        </label>
                        <input type="email" name="email" id="email"
                               className="bg-transparent border border-gray-600  text-gray-300 text-md rounded-lg block w-full p-2.5 "
                               placeholder="Choose a preferred username" required/>
                      </div>
                      <div>
                        <div className="flex justify-between">
                          <label htmlFor="password" className="block mb-2 text-sm text-gray-300">Password</label>
                          <span
                            className="flex items-center text-xs  font-medium text-gray-300 hover:underline dark:text-primary-500">
                            Forgot
                            password?
                          </span>
                        </div>
                        <div className="relative">
                          <input type="password" name="password" id="password" placeholder="Choose a strong password"
                                 className="border border-gray-600 text-gray-300 rounded-lg block w-full p-2.5 bg-transparent"
                                 required/>
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                            <ShowIcon/>
                          </div>
                        </div>
                      </div>
                      <div>
                        <button type="submit"
                                className="bg-blue-500 w-full text-white  font-medium rounded-md text-md px-5 py-2.5 text-center">
                          Continue
                        </button>
                        <p className="text-sm text-gray-400 mt-2">
                          Already have an account?{ " " }
                          <span className="font-medium text-gray-300 hover:underline">
                            Login →?
                          </span>
                        </p>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </div>
    </Dialog>
  </Transition.Root>
);

export default RegisterModal;
