import { withAuth } from "@/lib/withAuth";

function Cart() {
  return (
    <div>
      <h1>Your Cart</h1>
      {/* Cart content */}
    </div>
  );
}

export default withAuth(Cart);
