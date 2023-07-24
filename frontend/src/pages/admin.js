import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Admin from "@/components/admin/Admin";

const admin = ({
  users,
  pages,
  keyword,
  pageNumber,
  startRange,
  endRange,
  count,
}) => {
  return (
    <Admin
      users={users}
      pages={pages}
      keyword={keyword}
      pageNumber={pageNumber}
      startRange={startRange}
      endRange={endRange}
      count={count}
    />
  );
};

export default admin;

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
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/all?keyword=${keyword}&pageNumber=${pageNumber}`,
    options
  );
  const data = await res.json();

  const { users, page, pages, startRange, endRange, count } = data;

  return {
    props: { users, pages, keyword, pageNumber, startRange, endRange, count },
  };
}
