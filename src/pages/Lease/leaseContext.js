import React from "react";

export const generated = {
  title: "Lease Created",
  content: (
    <>
      <p>
        Your lease has been created and all you need do is append your signature
      </p>
      <p>
        We advice that you peruse the lease document and reach out to the
        property manager (through our chat system) wherever or whenever need be.
      </p>
    </>
  ),
  action: 1
};

export const finalNotOwner = {
  title: "Awaiting Final Signature",
  content: (
    <>
      <p>
        Tenant has signed lease. You have privilege to sign this lease on his
        behalf of the landlord.
      </p>
      <p>
        Click the Sign This Lease button below to finalise the lease and have
        our system auto generate the rental payment schedule, or simply wait on
        the landlord to sign.
      </p>
    </>
  ),
  action: 2
};

export const finalOwner = {
  title: "Awaiting Final Signature",
  content: (
    <>
      <p>Tenant has signed lease. </p>
      <p>
        Click the Sign This Lease button below to finalise the lease and have
        our system auto generate the rental payment schedule.
      </p>
    </>
  ),
  action: 3
};

export const finalTenant = {
  title: "Awaiting Final Signature",
  content: (
    <p>
      All that remains is for the property owner to append his/her signature and
      you would be good to go.
    </p>
  )
};

export const finalizedTenant = {
  title: "Lease Finalized",
  content: <p>Lease is ready and payments can be made</p>,
  action: 10
};

export const finalizedOwner = {
  title: "Lease Finalized",
  content: (
    <p>
      Hurray!!!, Lease is ready, we expect payment from the lessee anytime from
      now
    </p>
  ),
  action: 10
};

export const newLease = {
  title: "Create Lease",
  content: (
    <>
      <p>
        This is a lease generator intended to make leasing as smooth as possible
      </p>
      <p>
        By default, we've create some templates for you so that you can easily
        fast track your process of generating lease.
      </p>
    </>
  )
};
