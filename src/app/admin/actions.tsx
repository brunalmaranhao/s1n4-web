"use server";

import { apiServer } from "@/services/apiClient";
import { handleAxiosError } from "@/services/error";
import CustomerService from "@/services/models/customer";
import ProjectUpdatesService from "@/services/models/project-updates";
import ProjectsService from "@/services/models/projects";
import ResponsiblePartiesService from "@/services/models/responsible-parties";
import UserService from "@/services/models/user";

export async function getUserById(
  id: string,
  token?: string,
): Promise<IUserResponse> {
  try {
    const { getUserById } = await UserService();
    // console.log(id);
    // console.log(token);
    const response = await getUserById(id, token);
    // console.log(response);
    return {
      isError: false,
      user: response,
    };
  } catch (error) {
    const customError = handleAxiosError(error);
    return { isError: true, error: customError.message };
  }
}

// export async function fetchBirthdaysOfTheMonth(token: string) {
//   try {
//     const { fetchBirthdaysOfTheMonth } = await ResponsiblePartiesService();
//     const response = await fetchBirthdaysOfTheMonth(token);
//     return {
//       isError: false,
//       responsibles: response,
//     };
//   } catch (error) {
//     const customError = handleAxiosError(error);
//     return { isError: true, error: customError.message };
//   }
// }

// export async function fetchAllProjects(token: string) {
//   try {
//     const { fetchAllProjects } = await ProjectsService();
//     const { projects } = await fetchAllProjects(token, 1, 20);
//     return {
//       isError: false,
//       projects: projects,
//     };
//   } catch (error) {
//     const customError = handleAxiosError(error);
//     return { isError: true, error: customError.message };
//   }
// }

export async function fetchAllProjectUpdates(token: string) {
  try {
    const { fetchAllProjectUpdates } = await ProjectUpdatesService();
    const response = await fetchAllProjectUpdates(token);
    return {
      isError: false,
      updates: response.updates,
    };
  } catch (error) {
    const customError = handleAxiosError(error);
    return { isError: true, error: customError.message };
  }
}

export async function getProjectById(id: string, token: string) {
  try {
    const { getProjectById } = await ProjectsService();
    const response = await getProjectById(id, token);
    return {
      isError: false,
      project: response.project,
    };
  } catch (error) {
    const customError = handleAxiosError(error);
    return { isError: true, error: customError.message };
  }
}

export async function getCustomerById(id: string, token: string) {
  try {
    const { getCustomerById } = await CustomerService();
    const response = await getCustomerById(id, token);
    return {
      isError: false,
      customer: response.customer,
    };
  } catch (error) {
    const customError = handleAxiosError(error);
    return { isError: true, error: customError.message };
  }
}
