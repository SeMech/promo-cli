import React, { Component } from 'react';
import styled from 'styled-components';

class TestPage extends Component {
    render() {
        const { className } = this.props;

        return (
            <Root className={className}>
                TestPage
            </Root>
        );
    }
}

const Root = styled.div`
`;

export default TestPage;
