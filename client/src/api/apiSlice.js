import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  tagTypes: ["Projects", "Tasks"],
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: () => "projects",
      providesTags: ["Projects"],
    }),

    createProject: builder.mutation({
      query: (project) => ({
        url: "projects/create",
        method: "POST",
        body: project,
      }),
      invalidatesTags: ["Projects"],
    }),

    getTasks: builder.query({
      query: (projectID) => `tasks?projectID=${projectID}`,
      providesTags: (result) =>
        result?.task
          ? [
              ...result.task.map((task) => ({ type: "Tasks", id: task._id })),
              { type: "Tasks", id: "LIST" },
            ]
          : [{ type: "Tasks", id: "LIST" }],
    }),

    createTask: builder.mutation({
      query: (task) => ({
        url: "tasks/create",
        method: "POST",
        body: task,
      }),
      invalidatesTags: ["Tasks"],
    }),

    updateTask: builder.mutation({
      query: ({ taskID, status }) => ({
        url: `tasks/${taskID}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: (result, error, { taskID }) => [
        { type: "Tasks", id: taskID },
      ],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useCreateProjectMutation,
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
} = api;
