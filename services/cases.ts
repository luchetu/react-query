import { createApi } from '@reduxjs/toolkit/query/react'
import { gql } from 'graphql-request'
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'
import { CaseDetails, CaseResponse, GetCasesResponse, CaseContacts } from "../types/index";

const api = createApi({
    baseQuery: graphqlRequestBaseQuery({
        url: '/graphql'
    }),
    endpoints: (builder) => ({
        getCases: builder.query<GetCasesResponse, { page?: number; per_page?: number }>
            ({
                query: ({ page, per_page }) => ({
                    document: gql`
                  query GetCases($page: Int = 1, $per_page: Int = 10) {
                    cases(page: $page, per_page: $per_page) {
                        caseNumber,
                        caseTitle,
                        caseType,
                        partiesInvolved,
                        caseStatus,
                        deadlines,
                        caseDescription,
                        caseNotes,
                        status
                    }
                  }
                `,
                    variables: {
                        page,
                        per_page,
                    },
                }),
            }),
        getCase: builder.query<CaseDetails, string>({
            query: (id) => ({
                document: gql`
              query GetCase($id: ID!) {
                case(id: ${id}) {
                    caseNumber,
                    caseTitle,
                    caseType,
                    partiesInvolved,
                    caseStatus,
                    deadlines,
                    caseDescription,
                    caseNotes,
                    status
                }
              }
              `,
            }),
            transformResponse: (response: CaseResponse) => response.data.case,

        }),
        createCase: builder.mutation<CaseDetails, Partial<CaseDetails>>
            ({
                query: (newCase) => ({
                    document: gql`
          mutation CreateCase($newCase: CaseInput!) {
            createCase(input: $newCase) {
              caseNumber
              caseTitle
              caseType
              partiesInvolved
              caseStatus
              deadlines
              caseDescription
              caseNotes
              status
            }
          }
        `,
                    variables: {
                        newCase,
                    },
                })
            }),

    })
})

export const { useGetCaseQuery, useGetCasesQuery, useCreateCaseMutation } = api