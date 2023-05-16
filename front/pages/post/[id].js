import React from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import { LOAD_POST_REQUEST } from "../../reducers/post";

import AppLayout from "../../components/AppLayout";
import PostCard from "../../components/PostCard";

import { END } from "redux-saga";
import axios from "axios";
import Head from "next/head";

import wrapper from "../../store/configureStore";

const Post = () => {
  const router = useRouter();
  const { id } = router.query;

  const { singlePost } = useSelector((state) => state.post);

  return (
    <AppLayout>
      <Head>
        <title>
          {singlePost ? singlePost.User.nickname : ""}
          님의 글
        </title>
        <meta
          name="description"
          content={singlePost ? singlePost.content : ""}
        />
        <meta
          property="og:title"
          content={`${singlePost ? singlePost.User.nickname : ""}님의 게시글`}
        />
        <meta
          property="og:description"
          content={singlePost ? singlePost.content : ""}
        />
        <meta
          property="og:image"
          content={
            singlePost
              ? singlePost.Images[0]
              : ""
              ? singlePost.Images[0].src
              : "https://nodebird.com/favicon.ico"
          }
        />
        <meta property="og:url" content={`https://nodebird.com/post/${id}`} />
      </Head>

      <PostCard post={singlePost} />
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const cookie = context.req ? context.req.headers.cookie : "";
    console.log(context);
    axios.defaults.headers.Cookie = "";
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch({
      type: LOAD_MY_INFO_REQUEST, // 로그인 여부
    });
    context.store.dispatch({
      type: LOAD_POST_REQUEST, // 단일 게시글 불러오기
      data: context.params.id, //  또는 context.query.id 햐면 useRouter에 똑같이 접근할 수 있다.
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default Post;
