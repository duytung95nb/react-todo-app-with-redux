import React from 'react';
import './Loading.scss';

function Loading({ loading }) {
    return <div className={'Loading ' + (loading ? "": "Loading--Hidden")}>Loading</div>
}
export default Loading;