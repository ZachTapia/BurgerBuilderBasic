import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Auxiliary from '../Auxiliary/Auxiliary';



const withErrorHandler = (WrappedComponent, Axios) => {
    return class extends Component {
        state = {
            error: null
        };

        componentWillMount() {
            this.requestInterceptor = Axios.interceptors.request.use(request => {
                this.setState({ error: null });
                return request;
            });
            this.responseInterceptor = Axios.interceptors.response.use(response => {
                return response;
            }, error => {
                this.setState({ error: error });
            });
        }

        componentWillUnmount() {
            Axios.interceptors.request.eject(this.requestInterceptor);
            Axios.interceptors.request.eject(this.responseInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({ error: null });
        };

        render() {
            return (
                <Auxiliary>
                    <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler} >
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Auxiliary >
            );
        }
    };
};


export default withErrorHandler;