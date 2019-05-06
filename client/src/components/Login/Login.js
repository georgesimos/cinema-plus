import React, { Component } from 'react'
import './Login.css'
export default class Login extends Component {
    state = {
        activePanel: 'left'
    }
    onPanelChange(panel) {
        this.setState({ activePanel: panel })
    }
    render() {
        return (
            <div className='login-page'>
                <div className={`container ${this.state.activePanel === 'right' && 'right-panel-active'}`} id='container'>
                    <div className='form-container sign-up-container'>
                        <form action='#'>
                            <h1>Create Account</h1>
                            <div className='social-container'>
                                <a href='#' className='social'><i className='fab fa-facebook-f'></i></a>
                                <a href='#' className='social'><i className='fab fa-google-plus-g'></i></a>
                                <a href='#' className='social'><i className='fab fa-linkedin-in'></i></a>
                            </div>
                            <span>or use your email for registration</span>
                            <input type='text' placeholder='Name' />
                            <input type='email' placeholder='Email' />
                            <input type='password' placeholder='Password' />
                            <button>Sign Up</button>
                        </form>
                    </div>
                    <div className='form-container sign-in-container'>
                        <form action='#'>
                            <h1>Sign in</h1>
                            <div className='social-container'>
                                <a href='#' className='social'><i className='fab fa-facebook-f'></i></a>
                                <a href='#' className='social'><i className='fab fa-google-plus-g'></i></a>
                                <a href='#' className='social'><i className='fab fa-linkedin-in'></i></a>
                            </div>
                            <span>or use your account</span>
                            <input type='email' placeholder='Email' />
                            <input type='password' placeholder='Password' />
                            <a href='#'>Forgot your password?</a>
                            <button>Sign In</button>
                        </form>
                    </div>
                    <div className='overlay-container'>
                        <div className='overlay'>
                            <div className='overlay-panel overlay-left'>
                                <h1>Welcome Back!</h1>
                                <p>To keep connected with us please login with your personal info</p>
                                <button className='ghost' id='signIn' onClick={() => this.onPanelChange('left')} >Sign In</button>
                            </div>
                            <div className='overlay-panel overlay-right'>
                                <h1>Hello, Friend!</h1>
                                <p>Enter your personal details and start journey with us</p>
                                <button className='ghost' id='signUp' onClick={() => this.onPanelChange('right')} >Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
