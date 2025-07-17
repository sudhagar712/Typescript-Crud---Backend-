import { Query } from "mongoose";

export class ApiFeatures {
  query: Query<any, any>;
  queryStr: Record<string, any>;

  constructor(query: Query<any, any>, queryStr: Record<string, any>) {
    this.query = query;
    this.queryStr = queryStr;
  }

  // Example method: search by keyword
  search(): this {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find(keyword);
    return this;
  }

  // Example method: filter by category
  // Updated filter method
  filter(): this {
    const queryCopy = { ...this.queryStr };

    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((key) => delete queryCopy[key]);

    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  // Example method: pagination
  paginate(resultsPerPage: number): this {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resultsPerPage * (currentPage - 1);

    this.query = this.query.limit(resultsPerPage).skip(skip);
    return this;
  }
}
