import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AddConversations, ConversationType, MessageType } from '../../types/conwersations';

export const messageApi = createApi({
	reducerPath: 'messageApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4020/api/' }),
	tagTypes: ['Conversation', 'Message'],
	endpoints: (build) => ({
		getConversations: build.query<ConversationType[], string>({
			query: (userId) => ({
				url: `conversations/${userId}`
			}),
			providesTags: result => ['Conversation']
		}),
		addConversations: build.mutation<ConversationType[], AddConversations>({
			query: ({ senderId, receiverId }) => ({
				url: `conversations`,
				method: 'POST',
				body: { senderId, receiverId }
			}),
			invalidatesTags: ['Conversation']
		}),

		getMessages: build.query<MessageType[], string>({
			query: (conversationId) => ({
				url: `messages/${conversationId}`,
			}),
			providesTags: result => ['Message']
		})
	})
})

export const {
	useGetConversationsQuery,
	useAddConversationsMutation,

	useGetMessagesQuery
} = messageApi