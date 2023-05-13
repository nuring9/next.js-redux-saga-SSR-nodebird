import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Avatar, Button } from "antd";

import { logoutRequestAction } from "../reducers/user";
import styled from "styled-components";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { me, logOutLoading } = useSelector((state) => state.user);

  const onLogOut = useCallback(() => {
    dispatch(logoutRequestAction());
  }, []);

  const ButtonWrapper = styled.div`
    margin-top: 10px;
  `;

  return (
    <Card
      actions={[
        <div key="twit">
          좋아요
          <br />
          {me.Posts.length}
        </div>,
        <div key="followings">
          팔로잉
          <br />
          {me.Followings.length}
        </div>,
        <div key="followings">
          팔로워
          <br />
          {me.Followers.length}
        </div>,
      ]}
    >
      <Card.Meta
        avatar={<Avatar>{me.nickname[0]}</Avatar>}
        title={me.nickname}
      />
      <ButtonWrapper>
        <Button onClick={onLogOut} loading={logOutLoading}>
          로그아웃
        </Button>
      </ButtonWrapper>
    </Card>
  );
};

export default UserProfile;
