export function getInitials(user) {
  const firstName = user?.firstName?.trim();
  const lastName = user?.lastName?.trim();
  const name = user?.name?.trim();

  if (firstName) {
    const first = firstName[0].toUpperCase();
    const last = lastName ? lastName[0].toUpperCase() : "";
    return `${first}${last}`;
  }

  if (name) {
    const parts = name.split(/\s+/);
    const first = parts[0]?.[0]?.toUpperCase() || "";
    const last = parts[1]?.[0]?.toUpperCase() || "";
    return `${first}${last}` || first;
  }

  if (user?.email) {
    return user.email[0].toUpperCase();
  }

  return "U";
}

export function getDisplayName(user) {
  if (user?.firstName && user?.lastName) {
    return `${user.firstName} ${user.lastName}`;
  }
  if (user?.firstName) {
    return user.firstName;
  }
  return user?.name || "User";
}

export function getDeliveryLabel(user) {
  const city = user?.city?.trim();
  const country = (user?.country || user?.deliveryCountry || "").trim();

  if (city && country) return `${city}, ${country}`;
  if (city) return city;
  if (country) return country;
  return "Add address";
}

export function getFullAddress(user) {
  const parts = [
    user?.street?.trim(),
    user?.city?.trim(),
    user?.postalCode?.trim(),
    (user?.country || user?.deliveryCountry || "").trim(),
  ].filter(Boolean);

  return parts.join(", ");
}

export function toPublicUser(user) {
  const normalized = normalizeUserFromDb(user);
  const country =
    normalized.country || normalized.deliveryCountry || "Canada";

  return {
    firstName: normalized.firstName,
    lastName: normalized.lastName || "",
    name: getDisplayName(normalized),
    email: normalized.email,
    street: normalized.street || "",
    city: normalized.city || "",
    postalCode: normalized.postalCode || "",
    country,
    deliveryCountry: country,
    deliveryLabel: getDeliveryLabel({
      ...normalized,
      country,
    }),
    fullAddress: getFullAddress({
      ...normalized,
      country,
    }),
    marketingEmails: Boolean(normalized.marketingEmails),
  };
}

export function normalizeUserFromToken(tokenUser) {
  if (!tokenUser) return null;

  const country =
    tokenUser.country || tokenUser.deliveryCountry || "Canada";

  if (tokenUser.firstName) {
    return {
      firstName: tokenUser.firstName,
      lastName: tokenUser.lastName || "",
      name: tokenUser.name || tokenUser.firstName,
      email: tokenUser.email,
      street: tokenUser.street || "",
      city: tokenUser.city || "",
      postalCode: tokenUser.postalCode || "",
      country,
      deliveryCountry: country,
      deliveryLabel: getDeliveryLabel({
        city: tokenUser.city,
        country,
      }),
      fullAddress: getFullAddress({
        street: tokenUser.street,
        city: tokenUser.city,
        postalCode: tokenUser.postalCode,
        country,
      }),
      marketingEmails: Boolean(tokenUser.marketingEmails),
    };
  }

  if (tokenUser.name) {
    const parts = tokenUser.name.trim().split(/\s+/);
    return {
      firstName: parts[0] || "",
      lastName: parts.slice(1).join(" ") || "",
      name: tokenUser.name,
      email: tokenUser.email,
      street: tokenUser.street || "",
      city: tokenUser.city || "",
      postalCode: tokenUser.postalCode || "",
      country,
      deliveryCountry: country,
      deliveryLabel: getDeliveryLabel({
        city: tokenUser.city,
        country,
      }),
      fullAddress: getFullAddress({
        street: tokenUser.street,
        city: tokenUser.city,
        postalCode: tokenUser.postalCode,
        country,
      }),
      marketingEmails: Boolean(tokenUser.marketingEmails),
    };
  }

  return {
    firstName: "",
    lastName: "",
    name: tokenUser.email || "User",
    email: tokenUser.email,
    street: "",
    city: "",
    postalCode: "",
    country,
    deliveryCountry: country,
    deliveryLabel: getDeliveryLabel({ country }),
    fullAddress: getFullAddress({ country }),
    marketingEmails: Boolean(tokenUser.marketingEmails),
  };
}

export function normalizeUserFromDb(user) {
  const doc = user.toObject ? user.toObject() : { ...user };

  if (!doc.firstName && doc.name) {
    const parts = doc.name.trim().split(/\s+/);
    doc.firstName = parts[0] || "";
    doc.lastName = doc.lastName || parts.slice(1).join(" ") || "";
  }

  return doc;
}
