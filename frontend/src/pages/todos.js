import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Todos from "@/components/todos/Todos";

const todos = ({
  todos,
  pageNumber,
  pages,
  keyword,
  startRange,
  endRange,
  count,
}) => {
  return (
    <Todos
      todos={todos}
      pageNumber={pageNumber}
      pages={pages}
      keyword={keyword}
      startRange={startRange}
      endRange={endRange}
      count={count}
    />
  );
};

export default todos;

export async function getServerSideProps(context) {
  const { query } = context;
  const keyword = query?.s || "";
  const pageNumber = query?.page || 1;

  const session = await getServerSession(context.req, context.res, authOptions);
  //Get All Users
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.jwt}`,
    },
  };
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/todos/all?keyword=${keyword}&pageNumber=${pageNumber}`,
    options
  );
  const data = await res.json();

  const { todos, pages, startRange, endRange, count } = data;

  return {
    props: {
      todos,
      pageNumber,
      pages,
      keyword,
      startRange,
      endRange,
      count,
    },
  };
}
