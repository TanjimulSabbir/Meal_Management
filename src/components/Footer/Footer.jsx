import { FiGithub, FiLinkedin, FiFacebook } from 'react-icons/fi';
import { BsDiscord } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className='pt-10 bg-[#0a192f] text-Footer font-Bitter'>
            <footer className="footer pb-1 py-5 space-x-3 footer-center rounded">
                <div>
                    {/* <div className="grid grid-flow-col gap-4">
                    <Link className="link link-hover">About us</Link>
                    <Link className="link link-hover">Contact</Link>
                    <Link className="link link-hover">Rooms</Link>
                    <Link className="link link-hover">Press kit</Link>
                </div> */}

                    <div className='px-2'>
                        <div className='text-xs'>
                            <p>Copyright © 2023 - All rights reserved by Rangon House</p>
                        </div>
                        <small className='text-[9px]'>
                            Developed by <Link className='text-green-500' to="https://www.linkedin.com/in/TanjimulSabbir" target='_blank'>Tanjimul Islam Sabbir.</Link>
                            </small>
                            <div className='flex justify-center items-center space-x-2'>
                                <Link className='list-none text-[10px] text-white' to="https://github.com/TanjimulSabbir" target='_blank'><FiGithub /> </Link>
                                <Link className='list-none text-[10px] text-white' to="https://www.linkedin.com/in/TanjimulSabbir" target='_blank'><FiLinkedin /> </Link>
                                <Link className='list-none text-[10px] text-white' to="https://www.facebook.com/tanjimulsabbir.brahminykite" target='_blank'><FiFacebook /> </Link>

                                <Link className='list-none text-[10px] text-white' to="https://www.discord.com/tanjimulsabbir" target='_blank'><  BsDiscord /> </Link>
                            </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer