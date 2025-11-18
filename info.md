# 🚀 Prisma Commands Guide

## What is Prisma?

Prisma is like a **translator** between your code and database. It helps you talk to PostgreSQL using simple commands!

---

## 📋 Essential Commands (Copy & Paste Ready)

### 🔧 Setup Commands

```bash
# 1. Create Prisma client (do this first!)
npx prisma generate

# 2. Push your schema to database (quick way)
npx prisma db push

# 3. Open database viewer (like a file explorer for your data)
npx prisma studio
```

### 🔄 Migration Commands (Proper Way)

```bash
# 1. Create migration when you change schema
npx prisma migrate dev --name "your_change_name"

# 2. Apply migrations to production
npx prisma migrate deploy

# 3. Reset everything (⚠️ deletes all data!)
npx prisma migrate reset
```

### 🔍 Helpful Commands

```bash
# Check if database matches schema
npx prisma db pull

# Format your schema file
npx prisma format

# See migration status
npx prisma migrate status
```

---

## 🎯 When to Use What?

| Command              | When to Use               | Safe?             |
| -------------------- | ------------------------- | ----------------- |
| `prisma generate`    | After changing schema     | ✅ Always safe    |
| `prisma db push`     | Quick testing/prototyping | ⚠️ Can lose data  |
| `prisma migrate dev` | Proper development        | ✅ Tracks changes |
| `prisma studio`      | View/edit data            | ✅ Safe to browse |

---

## 🔄 Daily Workflow

### Starting New Feature:

1. Edit `schema.prisma`
2. Run `npx prisma migrate dev --name "add_new_feature"`
3. Code your feature
4. Test with `npx prisma studio`

### Quick Testing:

1. Edit `schema.prisma`
2. Run `npx prisma db push`
3. Run `npx prisma generate`
4. Test your code

---

## 🆘 Common Problems & Solutions

**Problem:** `PrismaClient` not found

```bash
# Solution:
npx prisma generate
```

**Problem:** Database out of sync

```bash
# Solution:
npx prisma db push
```

**Problem:** Want to start fresh

```bash
# Solution:
npx prisma migrate reset
```

---

## 🎮 Try These Commands Now!

1. **See your data:** `npx prisma studio`
2. **Generate client:** `npx prisma generate`
3. **Push schema:** `npx prisma db push`

**Remember:** Always run `prisma generate` after changing your schema!
