export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export type UserInfo = {
	full_name: string;
	names: {
		first: string;
		middle: string;
		last: string;
	};
	kerb: string;
	mit_id: number;
	class_year: string;
};

export type MoiraObject = 'list' | 'machine' | 'filesys' | 'user' | string;

export type Belonging = {
	type: MoiraObject;
	name: string;
};

export type MoiraException = {
	/**
	 * Internal Moira error code
	 */
	code: number;

	/**
	 * Error message from Moira
	 */
	message: string;

	/**
	 * Abbreviated error ID, such as MR_PERM
	 */
	name: string;
};

export type ListInfo = {
	name: string; // name of the list
	description: string; // description of the list
	active: boolean; // whether the list is active
	public: boolean; // whether the list is public (i.e. anyone can add themselves to it)
	hidden: boolean; // whether the list is hidden (i.e. only admins can know who is in it)
	is_mailing_list: boolean; // whether the list should forward mail to its members
	is_afs_group: boolean; // whether the list membership should be able to have definable permissions on AFS (and membership accessable through scripts via AFS-specific commands)
	is_nfs_group: boolean; // whether the list membership should be able to have definable permissions on NFS
	is_physical_access: boolean; // whether the list is linked to physical access control
	is_mailman_list: boolean; // whether the list is a mailman list
	owner: Belonging;
	membership_administrator: null | Belonging; // like above, but may be null...
	last_modified: {
		time: string; // last modified (TODO: use an actual timestamp)
		user: string; // who modified this list last?
		tool: string; // what did they use to modify it?
	};
};

/**
 * List members (not recursive)
 */
export type ListMembers = {
	users: string[];
	lists: string[];
	emails: string[];
	kerberos: string[];
};

export type MemberType = 'user' | 'email' | 'list' | 'kerberos';
