/* eslint-disable react/button-has-type */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
import React from 'react';
import { Link } from 'react-router-dom';

import Row from 'react-bootstrap/Row';

function FriendList({ friendCount, firstName, friends }) {
    if (!friends || !friends.length) {
        return <p className="bg-dark text-light p-3">{firstName}, make some friends!</p>;
    }

    return (
        <Row>
            <div>
                <h5>
                    {firstName}'s {friendCount} {friendCount === 1 ? 'friend' : 'friends'}
                </h5>
                {friends.map(friend => (
                    <button className="btn w-100 display-block mb-2" key={friend._id}>
                        <Link to={`/profile/${friend.email}`}>{friend.firstName} {friend.lastName}</Link>
                    </button>
                ))}
            </div>
        </Row>
    );
}

export default FriendList;
