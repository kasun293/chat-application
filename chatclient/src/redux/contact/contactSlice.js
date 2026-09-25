import { createSlice } from "@reduxjs/toolkit";
import { createContact, deleteContact, getAllContactList, getContactList, updateContact } from "./action";

const contactSlice = createSlice({
  name: "contact",
  initialState: {
    contacts: [],
    loading: false,
    error: null,
    pagination: {
        page: 0,
        size: 10,
        sortBy: "id",
        sortOrder: "asc",
    },
    totalElements: 0,
  },
  reducers: {
    setContacts: (state, action) => {
      state.contacts = action.payload;
    },
    clearContacts: (state) => {
      state.contacts = [];
    },
    setPage: (state, action) => {
      state.pagination.page = action.payload;
    },
    setSize: (state, action) => {
      state.pagination.size = action.payload;
    },
    setSortBy: (state, action) => {
      state.pagination.sortBy = action.payload;
    },
    setSortOrder: (state, action) => {
      state.pagination.sortOrder = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(getContactList.pending, (state) => {
        state.loading = true;
    })
    .addCase(getContactList.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = action.payload.payloadDto;
        state.totalElements = action.payload.totalElements;
    })
    .addCase(getContactList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
    })
    .addCase(createContact.pending, (state) => {
        state.loading = true;
    })
    .addCase(createContact.fulfilled, (state, action) => {
        state.loading = false;
        // state.contacts = [...state.contacts, action.payload];
    })
    .addCase(createContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
    })
    .addCase(updateContact.pending, (state) => {
        state.loading = true;
    })
    .addCase(updateContact.fulfilled, (state, action) => {
        state.loading = false;
        const updatedContact = action.payload;
        const index = state.contacts.findIndex(contact => contact.id === updatedContact.id);
        if (index !== -1) {
          state.contacts[index] = updatedContact;
        }
    })
    .addCase(updateContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
    })
    .addCase(getAllContactList.pending, (state) => {
        state.loading = true;
    })
    .addCase(getAllContactList.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = action.payload.dataList;
    })
    .addCase(getAllContactList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
    })
    .addCase(deleteContact.pending, (state) => {
        state.loading = true;
    })
    .addCase(deleteContact.fulfilled, (state, action) => {
        state.loading = false;
        const deletedContactId = action.meta.arg; // The ID of the deleted contact is passed as an argument
        state.contacts = state.contacts.filter(contact => contact.id !== deletedContactId);
        state.totalElements -= 1; // Decrease the total elements count
    })
    .addCase(deleteContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
    });
  }});

export const { setContacts, clearContacts, setPage, setSize, setSortBy, setSortOrder } = contactSlice.actions;
export default contactSlice.reducer;