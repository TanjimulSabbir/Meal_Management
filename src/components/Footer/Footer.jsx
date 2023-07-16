import { FiGithub, FiLinkedin, FiFacebook } from 'react-icons/fi';
import { CiTwitter } from 'react-icons/ci';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className='pt-10 bg-[#0a192f] text-Footer'>
            <footer className="footer pb-1 py-5 space-x-3 footer-center rounded">
                <div>
                    {/* <div className="grid grid-flow-col gap-4">
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Contact</a>
                    <a className="link link-hover">Rooms</a>
                    <a className="link link-hover">Press kit</a>
                </div> */}

                    <div className=''>
                        {/* <div className='mid-lg:fixed mid-lg:bottom-32 mid-lg:left-14'>
                            <div className='flex justify-center items-center space-x-5'>
                                <a className='list-none text-xs text-white' href="/#"><FiGithub /> </a>
                                <a className='list-none text-xs text-white' href="/#"><FiLinkedin /> </a>
                                <a className='list-none text-xs text-white' href="/#"><FiFacebook /> </a>
                                <a className='list-none text-xs text-white' href="/#"><CiTwitter /> </a>
                            </div>
                        </div> */}
                        <div>
                            <p>Copyright © 2023 - All rights reserved by Rangon House. <small>
                            Developed by <Link className='text-green-500' to="https://github.com/TanjimulSabbir" target='_blank'>Tanjimul Islam Sabbir.</Link>
                            </small>
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer