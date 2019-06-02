import React, { Component } from 'react'
import axios from 'axios'
import './Login.css'
export default class Login extends Component {
    state = {
        activePanel: 'left',
        username: '',
        password: '',
        error: ''
    }
    onPanelChange(panel) {
        this.setState({ activePanel: panel })
    }
    async onUserLogin(e) {
        e.preventDefault()
        const { username, password } = this.state
        try {
            const response = await axios.post('http://localhost:3001/users/login', { username, password })
            if (response.ok) console.log('Log in')
            console.log(response)
            // Save to localStorage
            const { token } = response.data;
            // Set token to localStorage
            localStorage.setItem("jwtToken", token);
        } catch (e) {
            this.setState({ error: 'You have entered an invalid username or password' })
        }

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
                        <form onSubmit={(e) => this.onUserLogin(e)}>
                            <h1>Sign in</h1>
                            <div className='social-container'>
                                <a href='#' className='social'><i className='fab fa-facebook-f'></i></a>
                                <a href='#' className='social'><i className='fab fa-google-plus-g'></i></a>
                                <a href='#' className='social'><i className='fab fa-linkedin-in'></i></a>
                            </div>
                            <span>or use your account</span>
                            <input type='text' placeholder='Username' onChange={(e) => this.setState({ username: e.target.value })} />
                            <input type='password' placeholder='Password' onChange={(e) => this.setState({ password: e.target.value })} />
                            {this.state.error && <span style={{ color: 'red' }}>{this.state.error}</span>}
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
