import React from "react";
import { Button } from "../../components/button/Button";

function CompletionPage(props) {
  return (
    <div className="completionPage">
      <div className="questions">Getting Set...</div>
      <p>
        Before proceeding to publish your property, it would be nice to provide
        the property’s owners information now, however, you can do that later
      </p>
      <Button>Setup Property Owner</Button>
      <br />
      <p />
      <div className="questions">Property is ready for Publish</div>
      <p>
        To check how your potential tenants/buyers will view your listing, click
        preview listing. Or you can just go ahead and hit the publish button to
        make this listing public.
      </p>
      <Button className="publishBtn">Publish Property</Button>
    </div>
  );
}

export default CompletionPage;
