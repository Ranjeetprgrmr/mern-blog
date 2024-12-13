import React from "react";
import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import {
    BsGithub,
    BsFacebook,
    BsInstagram,
    BsGoogle,
} from "react-icons/bs";

export default function FooterCom() {
  return (
    <Footer container className="borde border-t-8 border-teal-500 ">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="mt-5">
            <Link
              to="/"
              className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
            >
              <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-lg ">
                MERN
              </span>
              Blog
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="About" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://github.com/ranjeetsinghtharu"
                  targrt="_blank"
                  rel="noopener noreferrer"
                >
                  Ranjeet's Projects
                </Footer.Link>
                <Footer.Link
                  href="/about"
                  targrt="_blank"
                  rel="noopener noreferrer"
                >
                  MERN Blog
                </Footer.Link>
              </Footer.LinkGroup>
            </div>

            <div>
              <Footer.Title title="Follow us" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://github.com/ranjeetsinghtharu"
                  targrt="_blank"
                  rel="noopener noreferrer"
                >
                  Github
                </Footer.Link>
                <Footer.Link href="#">Discord</Footer.Link>
              </Footer.LinkGroup>
            </div>

            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Privacy Policy</Footer.Link>
                <Footer.Link href="#">Terms & Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="flex-col items-center justify-between sm:flex sm:flex-row-reverse">
          <Footer.Copyright
            href="#"
            by="Ranjeet Singh Tharu"
            year={new Date().getFullYear()}
          />
          <div className="flex mt-4 space-x-6 sm:mt-0 ">
            <Footer.Icon href="#" icon={BsGithub} />
            <Footer.Icon href="#" icon={BsFacebook} />
            <Footer.Icon href="#" icon={BsInstagram} />
            <Footer.Icon href="#" icon={BsGithub} />
            <Footer.Icon href="#" icon={BsGoogle} />
          </div>
        </div>
      </div>
    </Footer>
  );
}
