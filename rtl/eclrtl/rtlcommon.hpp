#ifndef ECLCOMMON_HPP
#define ECLCOMMON_HPP


#include "jiface.hpp"
#include "jfile.hpp"
#include "eclrtl.hpp"
#include "eclhelper.hpp"

//The CThorContiguousRowBuffer is the source for a readAhead call to ensure the entire row
//is in a contiguous block of memory.  The read() and skip() functions must be implemented
class ECLRTL_API CThorContiguousRowBuffer : implements IRowDeserializerSource
{
public:
    CThorContiguousRowBuffer(ISerialStream * _in);

    inline void setStream(ISerialStream *_in) { in.set(_in); maxOffset = 0; readOffset = 0; }

    virtual const byte * peek(size32_t maxSize);
    virtual offset_t beginNested();
    virtual bool finishedNested(offset_t & len);

    virtual size32_t read(size32_t len, void * ptr);
    virtual size32_t readSize();
    virtual size32_t readPackedInt(void * ptr);
    virtual size32_t readUtf8(ARowBuilder & target, size32_t offset, size32_t fixedSize, size32_t len);
    virtual size32_t readVStr(ARowBuilder & target, size32_t offset, size32_t fixedSize);
    virtual size32_t readVUni(ARowBuilder & target, size32_t offset, size32_t fixedSize);

    //These shouldn't really be called since this class is meant to be used for a deserialize.
    //If we allowed padding/alignment fields in the input then the first function would make sense.
    virtual void skip(size32_t size);
    virtual void skipPackedInt();
    virtual void skipUtf8(size32_t len);
    virtual void skipVStr();
    virtual void skipVUni();

    inline bool eos()
    {
        return in->eos();
    }

    inline offset_t tell() const
    {
        return in->tell();
    }

    inline void clearStream()
    {
        in.clear();
        maxOffset = 0;
        readOffset = 0;
    }

    inline const byte * queryRow() { return buffer; }
    inline size32_t queryRowSize() { return readOffset; }
    inline void finishedRow()
    {
        if (readOffset)
            in->skip(readOffset);
        maxOffset = 0;
        readOffset = 0;
    }


protected:
    size32_t sizePackedInt();
    size32_t sizeUtf8(size32_t len);
    size32_t sizeVStr();
    size32_t sizeVUni();
    void reportReadFail();

private:
    inline void doPeek(size32_t maxSize)
    {
        buffer = static_cast<const byte *>(in->peek(maxSize, maxOffset));
    }

    void doRead(size32_t len, void * ptr);

    inline void ensureAccessible(size32_t required)
    {
        if (required > maxOffset)
        {
            doPeek(required);
            assertex(required <= maxOffset);
        }
    }

protected:
    Linked<ISerialStream> in;
    const byte * buffer;
    size32_t maxOffset;
    size32_t readOffset;
};

#endif
